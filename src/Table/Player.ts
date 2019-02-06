export class Player {
  public name:string;
  public desc:string;

  constructor(name:string, desc:string) {
    this.name = name;
    this.desc = desc;
  }

  public toString():string {
    return `Player(${this.name})`;
  }
}