import { persist } from 'mobx-persist';
import { observable } from 'mobx';

export default class UI {

  @persist
  @observable
  hello = 'world'

}
