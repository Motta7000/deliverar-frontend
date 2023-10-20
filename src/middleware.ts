export {default} from "next-auth/middleware"

//Aca vamos a agregar las paginas que queremos que esten protegidas
export const config = {matcher: ["/dashboard", "/profile", "/orders"]}