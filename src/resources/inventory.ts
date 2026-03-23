import type { HttpClient } from "../client.js";
import type {
  InventoryItem,
  InventoryItemCreateParams,
  InventoryItemUpdateParams,
  InventoryItemListParams,
  StockAdjustment,
  InventoryCategory,
  InventoryCategoryCreateParams,
  BillOfMaterials,
  BomCreateParams,
  InventoryTransfer,
  TransferCreateParams,
  AssemblyOrder,
  AssemblyOrderCreateParams,
  PaginatedResponse,
  PaginationParams,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapList, unwrapPaginated } from "./_utils.js";

export class InventoryResource {
  private readonly client: HttpClient;
  readonly categories: InventoryCategoriesResource;
  readonly bom: InventoryBomResource;
  readonly transfers: InventoryTransfersResource;
  readonly assemblyOrders: InventoryAssemblyResource;

  constructor(client: HttpClient) {
    this.client = client;
    this.categories = new InventoryCategoriesResource(client);
    this.bom = new InventoryBomResource(client);
    this.transfers = new InventoryTransfersResource(client);
    this.assemblyOrders = new InventoryAssemblyResource(client);
  }

  /** List inventory items. */
  async list(params?: InventoryItemListParams, options?: RequestOptions): Promise<PaginatedResponse<InventoryItem>> {
    const response = await this.client.get<unknown>("/api/v1/inventory", params as Record<string, unknown>, options);
    return unwrapPaginated<InventoryItem>(response, "data", "inventoryItems");
  }

  /** Create a new inventory item. */
  async create(params: InventoryItemCreateParams, options?: RequestOptions): Promise<InventoryItem> {
    const response = await this.client.post<unknown>("/api/v1/inventory", params, options);
    return unwrap<InventoryItem>(response, "inventoryItem");
  }

  /** Get an inventory item by ID. */
  async get(id: string, options?: RequestOptions): Promise<InventoryItem> {
    const response = await this.client.get<unknown>(`/api/v1/inventory/${id}`, undefined, options);
    return unwrap<InventoryItem>(response, "inventoryItem");
  }

  /** Update an inventory item. */
  async update(id: string, params: InventoryItemUpdateParams, options?: RequestOptions): Promise<InventoryItem> {
    const response = await this.client.patch<unknown>(`/api/v1/inventory/${id}`, params, options);
    return unwrap<InventoryItem>(response, "inventoryItem");
  }

  /** Adjust stock levels. */
  async adjust(id: string, params: StockAdjustment, options?: RequestOptions): Promise<InventoryItem> {
    const response = await this.client.post<unknown>(`/api/v1/inventory/${id}/adjust`, params, options);
    return unwrap<InventoryItem>(response, "inventoryItem");
  }

  /** Get warehouse stock levels. */
  async warehouseStock(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    const response = await this.client.get<unknown>(`/api/v1/inventory/${id}/warehouse-stock`, undefined, options);
    return unwrapList<Record<string, unknown>>(response, "data");
  }

  /** Get lot tracking info. */
  async lots(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    const response = await this.client.get<unknown>(`/api/v1/inventory/${id}/lots`, undefined, options);
    return unwrapList<Record<string, unknown>>(response, "data");
  }

  /** Get serial numbers. */
  async serials(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    const response = await this.client.get<unknown>(`/api/v1/inventory/${id}/serials`, undefined, options);
    return unwrapList<Record<string, unknown>>(response, "data");
  }

  /** Get movement history. */
  async movements(id: string, params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Record<string, unknown>>> {
    const response = await this.client.get<unknown>(`/api/v1/inventory/${id}/movements`, params as Record<string, unknown>, options);
    return unwrapPaginated<Record<string, unknown>>(response, "data", "movements");
  }

  /** Get supplier info for an item. */
  async suppliers(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    const response = await this.client.get<unknown>(`/api/v1/inventory/${id}/suppliers`, undefined, options);
    return unwrapList<Record<string, unknown>>(response, "data");
  }

  /** Get item variants. */
  async variants(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    const response = await this.client.get<unknown>(`/api/v1/inventory/${id}/variants`, undefined, options);
    return unwrapList<Record<string, unknown>>(response, "data");
  }
}

class InventoryCategoriesResource {
  constructor(private readonly client: HttpClient) {}

  /** List inventory categories. */
  async list(options?: RequestOptions): Promise<InventoryCategory[]> {
    const response = await this.client.get<unknown>("/api/v1/inventory/categories", undefined, options);
    return unwrapList<InventoryCategory>(response, "flat", "data");
  }

  /** Create a new category. */
  async create(params: InventoryCategoryCreateParams, options?: RequestOptions): Promise<InventoryCategory> {
    const response = await this.client.post<unknown>("/api/v1/inventory/categories", params, options);
    return unwrap<InventoryCategory>(response, "category");
  }
}

class InventoryBomResource {
  constructor(private readonly client: HttpClient) {}

  /** List bills of materials. */
  async list(options?: RequestOptions): Promise<BillOfMaterials[]> {
    const response = await this.client.get<unknown>("/api/v1/inventory/bom", undefined, options);
    return unwrapList<BillOfMaterials>(response, "data");
  }

  /** Create a bill of materials. */
  async create(params: BomCreateParams, options?: RequestOptions): Promise<BillOfMaterials> {
    const response = await this.client.post<unknown>("/api/v1/inventory/bom", params, options);
    return unwrap<BillOfMaterials>(response, "bom");
  }
}

class InventoryTransfersResource {
  constructor(private readonly client: HttpClient) {}

  /** List inventory transfers. */
  async list(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<InventoryTransfer>> {
    const response = await this.client.get<unknown>("/api/v1/inventory/transfers", params as Record<string, unknown>, options);
    return unwrapPaginated<InventoryTransfer>(response, "data");
  }

  /** Create an inventory transfer. */
  async create(params: TransferCreateParams, options?: RequestOptions): Promise<InventoryTransfer> {
    const response = await this.client.post<unknown>("/api/v1/inventory/transfers", params, options);
    return unwrap<InventoryTransfer>(response, "transfer");
  }

  /** Complete an inventory transfer. */
  async complete(id: string, options?: RequestOptions): Promise<InventoryTransfer> {
    const response = await this.client.post<unknown>(`/api/v1/inventory/transfers/${id}/complete`, undefined, options);
    return unwrap<InventoryTransfer>(response, "transfer");
  }
}

class InventoryAssemblyResource {
  constructor(private readonly client: HttpClient) {}

  /** List assembly orders. */
  async list(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<AssemblyOrder>> {
    const response = await this.client.get<unknown>("/api/v1/inventory/assembly-orders", params as Record<string, unknown>, options);
    return unwrapPaginated<AssemblyOrder>(response, "data");
  }

  /** Create an assembly order. */
  async create(params: AssemblyOrderCreateParams, options?: RequestOptions): Promise<AssemblyOrder> {
    const response = await this.client.post<unknown>("/api/v1/inventory/assembly-orders", params, options);
    return unwrap<AssemblyOrder>(response, "order");
  }

  /** Complete an assembly order. */
  async complete(id: string, options?: RequestOptions): Promise<AssemblyOrder> {
    const response = await this.client.post<unknown>(`/api/v1/inventory/assembly-orders/${id}/complete`, undefined, options);
    return unwrap<AssemblyOrder>(response, "order");
  }
}
