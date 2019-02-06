import {Player} from './Player';
import {Position} from './Position';

export class Seat {
  public player:Player;
  public stack:number;
  public position:Position;
  public seatNum:number;

  constructor(player:string, stack:number, position:Position, seatNum:number) {
    this.player = new Player(player, '');
    this.stack = stack;
    this.position = position;
    this.seatNum = seatNum;
  }

  public toString():string {
    return `Seat:${this.player}(${this.stack})`;
  }
}