import { Server } from "socket.io";
export default (io: Server) => {
    // handle connection
    io.on("connection", (socket) => {
        // handle disconnect
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
}