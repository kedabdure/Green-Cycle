"use client";

import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axios from "axios";

import { TotalProducts } from "@/components/dashboard/overview/total-products";
import { LatestOrders } from "@/components/dashboard/overview/latest-orders";
import { LatestProducts } from "@/components/dashboard/overview/latest-products";
import { Sales } from "@/components/dashboard/overview/sales";
import { TasksProgress } from "@/components/dashboard/overview/tasks-progress";
import { TotalCustomers } from "@/components/dashboard/overview/total-customers";
import { TotalProfit } from "@/components/dashboard/overview/total-profit";
import { Traffic } from "@/components/dashboard/overview/traffic";

import { ProductProps } from "@/types/product";
import { OrderProps } from "@/types/order";
import { CustomerProps } from "@/types/customer";

// Fetch products from API
const fetchProducts = async (): Promise<ProductProps[]> => {
  const { data } = await axios.get("/api/products");
  return data;
};

// Fetch customers from API
const fetchCustomers = async (): Promise<CustomerProps[]> => {
  const { data } = await axios.get("/api/customers");
  return data;
};

// Fetch orders from API
const fetchOrders = async (): Promise<OrderProps[]> => {
  const { data } = await axios.get("/api/orders");
  return data;
};


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

  // HANDLE LOADING AND ERROR STATES
  if (isLoadingProducts || isLoadingCustomers || isLoadingOrders) return <div>Loading...</div>;
  if (isErrorProducts || isErrorCustomers || isErrorOrders) return <div>Error fetching data.</div>;


  // TOTAL SALE
  const totalSales = orders.reduce((acc, order) => {
    const lineItemTotal = order.line_items.reduce((sum: number, item: { quantity: number; price_data: { amount: number; }; }) => {
      return sum + item.quantity * item.price_data.amount;
    }, 0);
    return acc + lineItemTotal;
  }, 0).toFixed(2);


  // TASKS PROGRESS
  const completedTasks = orders.filter((order) => order.paid).length;
  const totalTasks = orders.length;
  const tasksProgress = (completedTasks / totalTasks) * 100

  // TOTAL PRODUCTS
  const totalProductsNow = products.length;
  const totalProductsLastMonth = products.filter((product) => dayjs(product.updatedAt).isAfter(dayjs().subtract(1, "month"))).length;
  const diffProducts = ((totalProductsNow - totalProductsLastMonth) / totalProductsLastMonth * 100).toFixed(1);
  const trendProducts = parseFloat(diffProducts) > 0 ? "up" : "down";


  // TOTAL CUSTOMERS
  const totalCustomersNow = customers.length;
  const totalCustomersLastMonth = customers.filter((customer) => dayjs(customer.createdAt).isAfter(dayjs().subtract(1, "month"))).length;
  const diffCustomers = ((totalCustomersNow + 1 - totalCustomersLastMonth) / totalCustomersLastMonth * 100).toFixed(1);
  const trendCustomers = parseFloat(diffCustomers) > 0 ? "up" : "down";


  console.log(diffProducts, trendProducts, totalProductsLastMonth, totalProductsNow);
  return (
    <Grid container spacing={3}>
      {/* TOTAL PRODUCTS */}
      <Grid lg={3} sm={6} xs={12}>
        <TotalProducts
          diff={diffProducts + 2}
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

      {/* TASKS PROGRESS */}
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: "100%" }} value={tasksProgress} />
      </Grid>

      {/* TOTAL SALE */}
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: "100%" }} value={`${totalSales}`} />
      </Grid>

      {/* TRAFFIC DISTRIBUTION */}
      <Grid md={6} xs={12}>
        <Traffic
          chartSeries={[63, 15, 22]}
          labels={["Desktop", "Tablet", "Phone"]}
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
          orders={orders.map((order: OrderProps) => ({
            id: order._id,
            customer: { name: order.firstName + " " + order.lastName },
            location: order.city + ", " + order.country,
            amount: order.line_items.amount,
            status: order.paid ? "delivered" : "pending",
            createdAt: dayjs(order.createdAt).toDate(),
          }))}
          sx={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
