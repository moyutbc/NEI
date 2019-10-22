import MomijiHeader from '~/views/components/atoms/MomijiHeader'

import IssueForm from '~/views/components/organisms/IssueForm'

export class HomePage implements Page {
  public async create(): void {
    new MomijiHeader({el: '#content > h2'})

    // new IssueForm({el: '.wiki'})
  }
}
