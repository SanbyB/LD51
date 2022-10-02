import { CHARACTER_FOLLOW_DIST, CHARACTER_SPEAD_DIST } from "./Config";
import { Bomber } from "./engine/entities/Bomber";
import { Engineer } from "./engine/entities/Engineer";
import { Player } from "./engine/entities/Player";
import { Scientist } from "./engine/entities/Scientist";
import { Solider } from "./engine/entities/Soldier";
import { ServiceLocator } from "./services/ServiceLocator";
import { CanvasHelper } from "./util/CanvasHelper";
import { randomIntRange } from "./util/math/Random";

export class PlayerController{
    public scientist: Scientist;
    public soldier: Solider;    
    public engineer: Engineer;    
    public bomber: Bomber;
    public players: Player[];
    public state: Player;

    public constructor(serviceLocator: ServiceLocator) {
        this.scientist = new Scientist(serviceLocator, 10, 10);
        this.soldier = new Solider(serviceLocator, 50, 10);       
        this.engineer = new Engineer(serviceLocator, 10, 50);        
        this.bomber = new Bomber(serviceLocator, 50, 50);
        this.players = [this.scientist, this.soldier, this.engineer, this.bomber];
        this.state = this.players[randomIntRange(0, this.players.length)];
        setInterval(() => this.selectPlayer(), 10000);
    }

    private selectPlayer(){
        this.state = this.players[randomIntRange(0, this.players.length)];
        console.log(this.state);
    }

    public update(serviceLocator: ServiceLocator){
        const camera = CanvasHelper.getCamera();
        CanvasHelper.setCamera(this.state.x, this.state.y, camera.scale);
        for(const i in this.players){
            if(this.players[i].hp <= 0){
                this.players.splice(parseInt(i), 1);
            }
        }
        this.follow();
        this.spread();
    }

    public follow(){
        for(const player of this.players){
            if(player != this.state){
                if(Math.abs(player.x - this.state.x) > CHARACTER_FOLLOW_DIST || Math.abs(player.y - this.state.y) > CHARACTER_FOLLOW_DIST){
                    const angle = player.getDirectionToTravelTo(this.state);
                    const rads = (angle / 180) * Math.PI;
                    player.xVel += Math.sin(rads) * player.speed;
                    player.yVel += -Math.cos(rads) * player.speed;
                }
            }
        }
    }

    public spread(){
        for(let i = 0; i < this.players.length; i++){
            for(let j = i + 1; j < this.players.length; j++){
                if(this.players[i] == this.state || this.players[j] == this.state){

                }
                else if(this.players[i].distanceTo(this.players[j]) < CHARACTER_SPEAD_DIST){
                    const angle = this.players[i].angleTo(this.players[j]);
                    const rads = (angle / 180) * Math.PI;
                    this.players[j].xVel += Math.sin(rads) * this.players[j].speed;
                    this.players[j].yVel += -Math.cos(rads) * this.players[j].speed;
                    // flip direction
                    const rads180 = (angle + 180 / 180) * Math.PI;
                    this.players[i].xVel += Math.sin(rads180) * this.players[i].speed;
                    this.players[i].yVel += -Math.cos(rads180) * this.players[i].speed;
                }
            }
        }
    }

}