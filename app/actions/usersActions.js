"use server";
import { revalidatePath } from "next/cache";
import { createUser, deleteUsers } from "../services/usersServices";

// Helper yang konsisten
const success = (data) => ({ success: true, data });
const failure = (message) => ({ success: false, message });

export async function CreateUserActions(formData) {
  const name=formData.get("name")
  const email=formData.get("email")
  const password=formData.get("password")
  const role=formData.get("role")
 try {
 
   const user=await createUser({
     name,email,password,role
   })
   revalidatePath("/users")
   return success(user)
 } catch (error) {
    console.error("[CREATE_USER_ERROR]:", error);
    return failure("Gagal menyimpan user ke sistem");
 }
}


export async function deleteUsersAction(id) {
  const numericId = Number(id);

  if (!numericId) return failure("ID produk tidak valid");

  try {
    await deleteUsers(numericId);

    revalidatePath("/users");
    return success();
  } catch (error) {
    console.error("[DELETE_PRODUCT_ERROR]:", error);
    return failure("Produk tidak bisa dihapus atau tidak ditemukan");
  }
}
