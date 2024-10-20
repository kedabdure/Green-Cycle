"use client";

import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axios from "axios";

import { TotalProducts } from "@/components/dashboard/overview/total-products";
import { LatestOrders } from "@/components/dashboard/overview/latest-orders";
import { LatestProducts } from "@/components/dashboard/overview/latest-products";
import { TotalCustomers } from "@/components/dashboard/overview/total-customers";
import { TotalProfit } from "@/components/dashboard/overview/total-profit";
import { Traffic } from "@/components/dashboard/overview/traffic";
import { TasksProgress } from "@/components/dashboard/overview/tasks-progress";
import { ScaleSpinner } from "@/components/loader/spinner";

import { ProductProps } from "@/types/product";
import { OrderProps } from "@/types/order";
import { Customer } from "@/types/customer";
import { CategoryProps } from "@/types/category";

// Fetch products from API
const fetchProducts = async (): Promise<ProductProps[]> => {
  const { data } = await axios.get("/api/products");
  return data;
};

// Fetch customers from API
const fetchCustomers = async (): Promise<Customer[]> => {
  const { data } = await axios.get("/api/customers");
  return data;
};

// Fetch orders from API
const fetchOrders = async (): Promise<OrderProps[]> => {
  const { data } = await axios.get("/api/orders");
  return data;
};

// Fetch categories from API
const fetchCategories = async (): Promise<CategoryProps[]> => {
  const { data } = await axios.get("/api/categories");
  return data;
}


export default function DashboardPage(): React.JSX.Element {
  // FETCH DATA USING REACT QUERY
  const { data: products = [], isLoading: isLoadingProducts, isError: isErrorProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: customers = [], isLoading: isLoadingCustomers, isError: isErrorCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const { data: orders = [], isLoading: isLoadingOrders, isError: isErrorOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const { data: categories = [], isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })


  // HANDLE LOADING AND ERROR STATES
  if (isLoadingProducts || isLoadingCustomers || isLoadingOrders || isLoadingCategories) return <ScaleSpinner />;
  if (isErrorProducts || isErrorCustomers || isErrorOrders || isErrorCategories) return <div>Error fetching data.</div>;


  // TOTAL SALE
  const totalSales = orders.reduce((acc, order) => {
    const lineItemTotal = order.line_items.reduce((sum: number, item: { quantity: number; price_data: { amount: number; }; }) => {
      return sum + item.quantity * item.price_data.amount;
    }, 0);
    return acc + lineItemTotal;
  }, 0).toFixed(0);


  // TASKS PROGRESS
  const completedTasks = orders.filter((order) => order.status === 'Delivered').length;
  const totalTasks = orders.length;
  const tasksProgress = ((completedTasks / totalTasks) * 100).toFixed(2);


  // TOTAL PRODUCTS
  const totalProductsNow = products.length;
  const totalProductsLastMonth = products.filter((product) =>
    dayjs(product.updatedAt).isAfter(dayjs().subtract(1, "week"))
  ).length;

  const diffProducts = totalProductsLastMonth > 0
    ? (((totalProductsNow - totalProductsLastMonth) / totalProductsLastMonth) * 100).toFixed(1)
    : "N/A";

  const trendProducts = totalProductsLastMonth === 0
    ? "up"
    : (parseFloat(diffProducts) > 0 ? "up" : "down");


  // TOTAL CUSTOMERS
  const totalCustomersNow = customers.length;
  const totalCustomersLastMonth = customers.filter((customer: Customer) =>
    dayjs(customer.createdAt).isAfter(dayjs().subtract(1, "month"))
  ).length;

  const diffCustomers = totalCustomersLastMonth > 0
    ? (((totalCustomersNow - totalCustomersLastMonth) / totalCustomersLastMonth) * 100).toFixed(1)
    : "N/A";

  const trendCustomers = totalCustomersLastMonth === 0
    ? "up"
    : (parseFloat(diffCustomers) > 0 ? "up" : "down");

  // TOTAL TRAFFIC DISTRIBUTION
  const mobileCatId = categories.find((cat) => cat.name === "Mobile")?._id;
  const pcId = categories.find((cat) => cat.name === "Pc")?._id;
  const tvId = categories.find((cat) => cat.name === "Tv")?._id;

  // calculate the total number of products in each category
  const mobileNumber = (products.filter((product) => product.category === mobileCatId).length / totalProductsNow) * 100;
  const pcNumber = (products.filter((product) => product.category === pcId).length / totalProductsNow) * 100;
  const tvNumber = (products.filter((product) => product.category === tvId).length / totalProductsNow) * 100;

  return (
    <Grid container spacing={3}>
      {/* TOTAL PRODUCTS */}
      <Grid lg={3} sm={6} xs={12}>
        <TotalProducts
          diff={diffProducts}
          trend={trendProducts}
          sx={{ height: "100%" }}
          value={products.length.toString()}
        />
      </Grid>

      {/* TOTAL CUSTOMERS */}
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers
          diff={diffCustomers}
          trend={trendCustomers}
          sx={{ height: "100%" }}
          value={customers.length.toString()}
        />
      </Grid>

      {/* ORDER COMPLETED */}
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: "100%" }} value={parseFloat(tasksProgress)} />
      </Grid>

      {/* TOTAL SALE */}
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: "100%" }} value={`${totalSales}`} />
      </Grid>

      {/* TRAFFIC DISTRIBUTION */}
      <Grid md={6} xs={12}>
        <Traffic
          chartSeries={[parseFloat(pcNumber.toFixed(2)), parseFloat(mobileNumber.toFixed(2)), parseFloat(tvNumber.toFixed(2))]}
          labels={["Desktop", "Mobile", "Tv"]}
          sx={{ height: "100%" }}
        />
      </Grid>

      {/* LATEST PRODUCTS */}
      <Grid md={6} xs={12}>
        <LatestProducts
          products={products.slice(0, 5).map((product: ProductProps) => ({
            id: product._id ?? '',
            name: product.title ?? 'Unknown',
            image: product?.images?.[0] ?? '',
            updatedAt: dayjs(product.updatedAt).toDate(),
          }))}
          sx={{ height: "100%" }}
        />
      </Grid>

      {/* LATEST ORDERS */}
      <Grid xs={12}>
        <LatestOrders
          orders={orders}
        />
      </Grid>
    </Grid>
  );
}
