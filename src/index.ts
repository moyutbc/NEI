import { AppController } from "~/controllers/app-controller";
import { Redmine } from "./gateways/redmine";
import { Issue } from "./models/issue";
import { Project } from "./models/Project";
import { IssuePage } from "./views/pages/issue-page";
import { FavMenu } from "./views/components/fav-menu";
import { FavButton } from "./views/components/fav-menu";

AppController.dispatch(window.location.href);

export { Redmine, Issue, Project, IssuePage };
