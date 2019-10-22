import { AppController } from "~/controllers/app-controller";
import { Redmine } from "./gateways/redmine";
import { Issue, IssueStatus, Project, Tracker } from "./models";
import { Resource } from "./services/resource"
import { LocalStore } from "./utilities";

import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

AppController.dispatch(window.location.href);

export {
  Redmine,
  Issue,
  IssueStatus,
  Project,
  Tracker,
  Resource,
  LocalStore
};
