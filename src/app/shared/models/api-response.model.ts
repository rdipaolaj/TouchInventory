// src/app/shared/models/api-response.model.ts
export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    transactionId: string;
    timestamp: string;
    errors: ErrorDetail[];
    metadata: { [key: string]: any };
}

export interface ErrorDetail {
    code: string;
    description: string;
}