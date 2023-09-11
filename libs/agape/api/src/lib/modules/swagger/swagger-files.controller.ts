import { Request, Response } from "express";
import { Controller, ExecutionContext, Get} from "../../decorators";

import FAVICON_16_PNG from './swagger-files/favicon-16x16.png'

import INDEX_HTML from './swagger-files/index.html'
import INDEX_CSS from './swagger-files/index.css'
import OATH2_REDIRECT_HTML from './swagger-files/oauth2-redirect.html'
import SWAGGER_CONFIG_YAML from "./swagger-files/swagger-config.yaml";
import SWAGGER_INITIALIZER_JS from "./swagger-files/swagger-initializer.js";
import SWAGGER_UI_BUNDLE_JS_MAP from "./swagger-files/swagger-ui-bundle.js.map";
import SWAGGER_UI_BUNDLE_JS from "./swagger-files/swagger-ui-bundle.js";
import SWAGGER_UI_ES_BUNDLE_CORE_JS_MAP from "./swagger-files/swagger-ui-es-bundle-core.js.map";
import SWAGGER_UI_ES_BUNDLE_CORE_JS from "./swagger-files/swagger-ui-es-bundle-core.js";
import SWAGGER_UI_ES_BUNDLE_JS from "./swagger-files/swagger-ui-es-bundle.js";
import SWAGGER_UI_ES_BUDNLE_JS_MAP  from "./swagger-files/swagger-ui-es-bundle.js.map";
import SWAGGER_UI_STANDALONE_PRESET_JS_MAP from "./swagger-files/swagger-ui-standalone-preset.js.map";
import SWAGGER_UI_STANDALONE_PRESET from "./swagger-files/swagger-ui-standalone-preset.js";
import SWAGGER_UI_CSS_MAP from "./swagger-files/swagger-ui.css.map";
import SWAGGER_UI_CSS from "./swagger-files/swagger-ui.css";
import SWAGGER_UI_JS from "./swagger-files/swagger-ui.js";
import SWAGGER_UI_JS_MAP from "./swagger-files/swagger-ui.js.map";

@Controller()
export class SwaggerFilesController {

    @Get('favicon-16x16.png', { swagger: false })
    favicon16( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(FAVICON_16_PNG), 'base64').toString('binary')
        context.res.setHeader('content-type', 'image/png');
        context.res.write(decodedFile)
        context.res.end()
    }
    
    @Get('', { swagger: false })
    indexHtml( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(INDEX_HTML), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/html');
        context.res.write(decodedFile)
    }

    @Get('index.css', { swagger: false })
    indexCss( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(INDEX_CSS), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/css');
        context.res.write(decodedFile)
    }

    @Get('oauth2-redirect.html', { swagger: false })
    oath2Redirect( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(OATH2_REDIRECT_HTML), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/html');
        context.res.write(decodedFile)
    }

    @Get('swagger-config.yaml', { swagger: false })
    swaggerConfigYaml( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_CONFIG_YAML), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-initializer.js', { swagger: false })
    swaggerInitializerJs( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_INITIALIZER_JS), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-bundle.js.map', { swagger: false })
    swaggerUiBundleJsMap( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_BUNDLE_JS_MAP), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-bundle.js', { swagger: false })
    swaggerUiBundleJS( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_BUNDLE_JS), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-es-bundle-core.js.map', { swagger: false })
    swaggerUiEsBundleCoreJsMap( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_ES_BUNDLE_CORE_JS_MAP), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-es-bundle-core.js', { swagger: false })
    swaggerUiEsBundleCoreJs( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_ES_BUNDLE_CORE_JS), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-es-bundle.js', { swagger: false })
    swaggerUiEsBundleJs( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_ES_BUNDLE_JS), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-es-bundle.js.map', { swagger: false })
    swaggerUiEsBundleJsMap( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_ES_BUDNLE_JS_MAP), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-standalone-preset.js.map', { swagger: false })
    swaggerUiStandalonePresetJsMap( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_STANDALONE_PRESET_JS_MAP), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui-standalone-preset.js', { swagger: false })
    swaggerUiStandalonePreset( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_STANDALONE_PRESET), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui.css.map', { swagger: false })
    swaggerUiCssMap( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_CSS_MAP), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui.css', { swagger: false })
    swaggerUiCss( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_CSS), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/css');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui.js', { swagger: false })
    swaggerUi( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_JS), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }

    @Get('swagger-ui.js.map', { swagger: false })
    swaggerUiJsMap( @ExecutionContext context: { req: Request, res: Response } ) {
        const decodedFile = Buffer.from(JSON.stringify(SWAGGER_UI_JS_MAP), 'base64').toString('utf8')
        context.res.setHeader('content-type', 'text/plain');
        context.res.write(decodedFile)
    }
}