import { CHARACTER_FOLLOW_DIST, CHARACTER_SPEAD_DIST } from "./Config";
import { Bomber } from "./engine/entities/Bomber";
import { Engineer } from "./engine/entities/Engineer";
import { Player } from "./engine/entities/Player";
import { Scientist } from "./engine/entities/Scientist";
import { Solider } from "./engine/entities/Soldier";
import { ProcedureService } from "./services/jobs/ProcedureService";
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

    public constructor(private serviceLocator: ServiceLocator) {
        this.scientist = new Scientist(serviceLocator, 512, 512);
        this.soldier = new Solider(serviceLocator, 480, 480);       
        this.engineer = new Engineer(serviceLocator, 480, 512);        
        this.bomber = new Bomber(serviceLocator, 512, 480);
        this.players = [this.scientist, this.soldier, this.engineer, this.bomber];
        this.state = this.players[randomIntRange(0, this.players.length)];
        this.state.onFocussed();
        for(const player of this.players){
            if(player == this.state){
                player.weight = 0;
            }else{
                player.weight += 1;
            }
        }
        ProcedureService.setGameInterval(() => this.selectPlayer(), 10000);

        // Force update camera initially
        CanvasHelper.setCamera(this.state.x, this.state.y, 1);
        CanvasHelper.updateCamera(true);
    }

    private selectPlayer(){
        let sum = 0;
        for(const player of this.players){
            sum += player.weight;
        }
        let rand = randomIntRange(1, sum + 1);
        for(const player of this.players){
            rand -= player.weight;
            if(rand <= 0){
                this.state.onUnfocussed();
                this.state = player;
                this.serviceLocator.getAudioService().play("change_player", 0.4);
                this.state.onFocussed();
                for(const player of this.players){
                    if(player == this.state){
                        player.weight = 0;
                    }else{
                        player.weight += 1;
                    }
                }
                return;
            }
        }
        
    }

    public update(serviceLocator: ServiceLocator){
        const camera = CanvasHelper.getCamera();
        CanvasHelper.setCamera(this.state.x, this.state.y, camera.scale);
        CanvasHelper.updateCamera(false);
        for(const i in this.players){
            if(this.players[i].hp <= 0){
                this.players.splice(parseInt(i), 1);
            }
        }
        if(this.state.hp <= 0){
            this.selectPlayer();
        }
        this.follow();
        this.spread();

        if (this.players.length == 0) {
            serviceLocator.getScriptingService().onGameEnd(false);
        }
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

    public getMainCharacter() {
        return this.state;
    }

}