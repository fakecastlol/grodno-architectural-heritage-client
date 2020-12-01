export const roleToString = (role) => {
    switch (role) {
        case 2:
            return "admin"
           
        case 3:
            return "user"

        default:
            return "user" 
    }
}