import { AppController } from "~/controllers/app-controller";
import { Redmine } from "./gateways/redmine";
import { LocalStore } from "./utilities/local-store";
import { Issue, IssueStatus, Project } from "./models";
import { IssuePage } from "./views/pages/issue-page";

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
  IssuePage,
  LocalStore
};
