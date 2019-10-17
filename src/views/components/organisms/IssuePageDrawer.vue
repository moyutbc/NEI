<template>
  <div>
    <el-button @click="drawer = true">
      show
    </el-button>

    <el-drawer
      :visible.sync="drawer"
      direction="ltr"
      @open="setup">
      <el-container>
        <el-header>
          お気に入り
          <el-button @click="fav">追加</el-button>
        </el-header>
        <el-main>
          <el-row type="flex" justify="space-between" v-for="(issue, index) in favs">
            <el-link
              :href="getIssueUrl(issue)"
              :underline="false">
              {{ issue.subject }}
            </el-link>
            <el-button
              icon="el-icon-delete"
              circle
              @click="unfav(index)">
            </el-button>
          </el-row>
        </el-main>
      </el-container>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Button, Container, Drawer, Header, Link, Main} from 'element-ui';
Vue.use(Button)
Vue.use(Container)
Vue.use(Drawer)
Vue.use(Header)
Vue.use(Link)
Vue.use(Main)

import { LocalStore } from '~/utilities/local-store';
import { Issue } from '~/models';

@Component
export default class IssuePageDrawer extends Vue {
  drawer: boolean = false
  issue: Issue = null
  favs: Array<any> = []

  /**
   * favsを初期化
   */
  private setup() {
    this.favs = LocalStore.get('issue-page.drawer.favs')
    if (!this.favs) {
      this.favs = []
      LocalStore.set('issue-page.drawer.favs', this.favs)
    }
  }

  /**
   * お気に入りに追加
   */
  private fav() {
    this.favs.push(this.issue)
    LocalStore.set('issue-page.drawer.favs', this.favs)
  }

  /**
   * お気に入りから削除
   */
  private unfav(index: number) {
    this.favs.splice(index, 1)
    LocalStore.set('issue-page.drawer.favs', this.favs)
  }

  /**
   * issueのページURL
   */
  private getIssueUrl(issue: Issue): string {
    return location.href.split('/').slice(0, -1).concat(issue.id).join('/');
  }
}
</script>
