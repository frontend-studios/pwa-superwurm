export interface MenuItemType {
  name: string;
  path: string;
  children?: MenuItemType[];
  type?: string;
  id: number;
  parentId?: number;
}
