import { AppController } from "./controllers/app-controller";
import { Redmine } from "./gateways/redmine";
import * as models from "./models";
import { Resource } from "./services/resource"
import { LocalStore } from "./utilities";

import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

AppController.dispatch(window.location.href);

export {
  ...models,
  Redmine,
  Resource,
  LocalStore
};
