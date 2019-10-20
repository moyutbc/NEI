<template>
  <li>
    <el-button
      type="text"
      @click="drawer = true"
      style="padding: 0; margin-right: 8px;">
      🍁
    </el-button>

    <el-drawer
      title="🍁 momiji"
      :visible.sync="drawer"
      direction="ltr"
      @open="setup">
      <el-container>
        <el-header>
          <el-row type="flex" justify="space-between">
            お気に入り
            <el-button @click="fav">追加</el-button>
          </el-row>
        </el-header>
        <el-main>
          <el-row type="flex" justify="space-between" v-for="(issue, index) in favs">
            <el-link
              :href="getIssueUrl(issue)"
              :underline="false">
              #{{issue.id}} {{ issue.subject }}
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
  </li>
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
