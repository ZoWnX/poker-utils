
export class Rank {
  public value: number;
  public name: string;
  public pluralName: string;
  public charName: string;

  constructor(value: number, charName: string, name: string, pluralName:string) {
    this.value = value;
    this.charName = charName;
    this.name = name;
    this.pluralName = pluralName;
  }
}