import MomijiHeader from '~/views/components/atoms/MomijiHeader'

export class HomePage implements Page {
  public async create(): void {
    new MomijiHeader({el: '#content > h2'})
  }
}
