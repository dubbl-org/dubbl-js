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
    return this.client.get<PaginatedResponse<InventoryItem>>("/api/v1/inventory", params as Record<string, unknown>, options);
  }

  /** Create a new inventory item. */
  async create(params: InventoryItemCreateParams, options?: RequestOptions): Promise<InventoryItem> {
    return this.client.post<InventoryItem>("/api/v1/inventory", params, options);
  }

  /** Get an inventory item by ID. */
  async get(id: string, options?: RequestOptions): Promise<InventoryItem> {
    return this.client.get<InventoryItem>(`/api/v1/inventory/${id}`, undefined, options);
  }

  /** Update an inventory item. */
  async update(id: string, params: InventoryItemUpdateParams, options?: RequestOptions): Promise<InventoryItem> {
    return this.client.patch<InventoryItem>(`/api/v1/inventory/${id}`, params, options);
  }

  /** Adjust stock levels. */
  async adjust(id: string, params: StockAdjustment, options?: RequestOptions): Promise<InventoryItem> {
    return this.client.post<InventoryItem>(`/api/v1/inventory/${id}/adjust`, params, options);
  }

  /** Get warehouse stock levels. */
  async warehouseStock(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/inventory/${id}/warehouse-stock`, undefined, options);
  }

  /** Get lot tracking info. */
  async lots(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/inventory/${id}/lots`, undefined, options);
  }

  /** Get serial numbers. */
  async serials(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/inventory/${id}/serials`, undefined, options);
  }

  /** Get movement history. */
  async movements(id: string, params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Record<string, unknown>>> {
    return this.client.get(`/api/v1/inventory/${id}/movements`, params as Record<string, unknown>, options);
  }

  /** Get supplier info for an item. */
  async suppliers(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/inventory/${id}/suppliers`, undefined, options);
  }

  /** Get item variants. */
  async variants(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/inventory/${id}/variants`, undefined, options);
  }
}

class InventoryCategoriesResource {
  constructor(private readonly client: HttpClient) {}

  /** List inventory categories. */
  async list(options?: RequestOptions): Promise<InventoryCategory[]> {
    return this.client.get<InventoryCategory[]>("/api/v1/inventory/categories", undefined, options);
  }

  /** Create a new category. */
  async create(params: InventoryCategoryCreateParams, options?: RequestOptions): Promise<InventoryCategory> {
    return this.client.post<InventoryCategory>("/api/v1/inventory/categories", params, options);
  }
}

class InventoryBomResource {
  constructor(private readonly client: HttpClient) {}

  /** List bills of materials. */
  async list(options?: RequestOptions): Promise<BillOfMaterials[]> {
    return this.client.get<BillOfMaterials[]>("/api/v1/inventory/bom", undefined, options);
  }

  /** Create a bill of materials. */
  async create(params: BomCreateParams, options?: RequestOptions): Promise<BillOfMaterials> {
    return this.client.post<BillOfMaterials>("/api/v1/inventory/bom", params, options);
  }
}

class InventoryTransfersResource {
  constructor(private readonly client: HttpClient) {}

  /** List inventory transfers. */
  async list(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<InventoryTransfer>> {
    return this.client.get<PaginatedResponse<InventoryTransfer>>("/api/v1/inventory/transfers", params as Record<string, unknown>, options);
  }

  /** Create an inventory transfer. */
  async create(params: TransferCreateParams, options?: RequestOptions): Promise<InventoryTransfer> {
    return this.client.post<InventoryTransfer>("/api/v1/inventory/transfers", params, options);
  }

  /** Complete an inventory transfer. */
  async complete(id: string, options?: RequestOptions): Promise<InventoryTransfer> {
    return this.client.post<InventoryTransfer>(`/api/v1/inventory/transfers/${id}/complete`, undefined, options);
  }
}

class InventoryAssemblyResource {
  constructor(private readonly client: HttpClient) {}

  /** List assembly orders. */
  async list(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<AssemblyOrder>> {
    return this.client.get<PaginatedResponse<AssemblyOrder>>("/api/v1/inventory/assembly-orders", params as Record<string, unknown>, options);
  }

  /** Create an assembly order. */
  async create(params: AssemblyOrderCreateParams, options?: RequestOptions): Promise<AssemblyOrder> {
    return this.client.post<AssemblyOrder>("/api/v1/inventory/assembly-orders", params, options);
  }

  /** Complete an assembly order. */
  async complete(id: string, options?: RequestOptions): Promise<AssemblyOrder> {
    return this.client.post<AssemblyOrder>(`/api/v1/inventory/assembly-orders/${id}/complete`, undefined, options);
  }
}
