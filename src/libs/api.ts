interface IEndpoint {
  url: string;
  call(handle: string, props?: any): Promise<any>;
}

export interface EndpointProps {
  url: string;
}

export interface Rejection {
  error: number;
  reason: number;
}

class endpoint implements IEndpoint {
  url: string;
  cooldown: boolean;
  cooldownTime: number;

  constructor(props: EndpointProps) {
    this.url = props.url;
    this.cooldown = false;
    this.cooldownTime = 1000;
  }

  async call<T>(handle: string, props?: any): Promise<T | Rejection> {
    var payload: T | Rejection;
    
    if (!this.cooldown) {
      
      try {
        payload = await fetch(this.url+handle, props).then((res) => res.json());

        await this.resetTimer();
        return payload;
      } catch (e) {
        console.log(e);
      }
    } else {

      console.log("cooling down");
    }

    var x: any;
    return x;
  }
  protected resetTimer() {
    this.cooldown = true;

    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        this.cooldown = false;
        resolve()
      }, this.cooldownTime);

    })
  }
}

export default endpoint;
