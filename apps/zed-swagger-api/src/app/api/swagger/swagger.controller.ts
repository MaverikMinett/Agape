import { Controller, StaticFiles } from "@agape/api";
import { AuthGuard } from "../auth/auth.guard";


@Controller()
export class SwaggerController {

    @StaticFiles('./apps/zed-auth-api/src/swagger', './apps/_swagger')
    staticFiles() {
        
     }

}