export interface IAsyncRepository {


    GetAllAsync(): Promise<any[]>;

    GetByIdAsync(id: any): Promise<any[]>;

    CreateAsync(entity: any): Promise<void>;

    

    DeleteAsync(id: any): Promise<void>;

    ShowMessage(message: any, isSuccess: any);
}