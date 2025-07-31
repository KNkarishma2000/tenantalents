import { z } from 'zod';
import { VendorStatus } from '@shared/types';
export declare const CreateVendorSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    userId: z.ZodString;
    storeName: z.ZodString;
    storeSlug: z.ZodString;
    status: z.ZodOptional<z.ZodNativeEnum<typeof VendorStatus>>;
    documents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    phone: string;
    userId: string;
    storeName: string;
    storeSlug: string;
    status?: VendorStatus | undefined;
    documents?: string[] | undefined;
}, {
    email: string;
    name: string;
    phone: string;
    userId: string;
    storeName: string;
    storeSlug: string;
    status?: VendorStatus | undefined;
    documents?: string[] | undefined;
}>;
export declare const UpdateVendorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    storeName: z.ZodOptional<z.ZodString>;
    storeSlug: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodOptional<z.ZodNativeEnum<typeof VendorStatus>>>;
    documents: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    userId?: string | undefined;
    storeName?: string | undefined;
    storeSlug?: string | undefined;
    status?: VendorStatus | undefined;
    documents?: string[] | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    userId?: string | undefined;
    storeName?: string | undefined;
    storeSlug?: string | undefined;
    status?: VendorStatus | undefined;
    documents?: string[] | undefined;
}>;
export declare const UpdateVendorStatusSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodNativeEnum<typeof VendorStatus>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: VendorStatus;
}, {
    id: string;
    status: VendorStatus;
}>;
export type CreateVendorDto = z.infer<typeof CreateVendorSchema>;
export type UpdateVendorDto = z.infer<typeof UpdateVendorSchema>;
export type UpdateVendorStatusDto = z.infer<typeof UpdateVendorStatusSchema>;
