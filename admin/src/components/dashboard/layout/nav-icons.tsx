import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Toolbox as ToolboxIcon } from '@phosphor-icons/react/dist/ssr/Toolbox';
import { ListChecks } from '@phosphor-icons/react/dist/ssr/ListChecks';
import { ShoppingCart } from '@phosphor-icons/react';
import { UserCircleGear } from '@phosphor-icons/react';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'x-square': XSquare,
  'toolbox': ToolboxIcon,
  'list-checks': ListChecks,
  'cart': ShoppingCart,
  'admin': UserCircleGear,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
