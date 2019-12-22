import { observable, action } from "mobx";

export default class CounterStore {
    
    @observable post_count = 0;
  
    @action increment() {
      this.post_count += 1;
    }
  
    @action decrement() {
      this.post_count -= 1;
    }
  }
  