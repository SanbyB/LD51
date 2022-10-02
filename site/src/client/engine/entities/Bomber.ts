import { BOMBER_ATTACK_STRENGTH, BOMBER_SPEED } from "../../Config";
import { ProcedureService } from "../../services/jobs/ProcedureService";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { randomFloatRange, randomIntRange } from "../../util/math";
import { CharacterEntity } from "./CharacterEntity";
import { Particle } from "./Particle";
import { Player } from "./Player";


const BOMBER_WIDTH = 30;
const BOMBER_HEIGHT = 30;

const BLOW_UP_DISTANCE = 128;
const BLOW_UP_DAMAGE = 200;
const BLOW_UP_PARTICLES = 20;

export class Bomber extends Player {

    public name: string = "Bomber";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "bomber", BOMBER_WIDTH, BOMBER_HEIGHT, "tnt");
        this.damage = BOMBER_ATTACK_STRENGTH;
        this.speed = BOMBER_SPEED;
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
    }


    public onFocussed() {
        super.onFocussed();
    }

    public onUnfocussed() {
        super.onUnfocussed();
    }

    public onDeath() {
        super.onDeath();
        for (let entity of this.serviceLocator.getWorld().getEntityArray()) {
            if (entity == this) continue;
            if (!(entity instanceof CharacterEntity)) continue;
            const character = entity as CharacterEntity;
            const distance = this.distanceTo(character);
            if (distance > BLOW_UP_DISTANCE) continue;
            const damage = (1 - (distance / BLOW_UP_DISTANCE)) * BLOW_UP_DAMAGE;
            character.onDamage(damage, this.angleTo(character));
        }
        this.serviceLocator.getAudioService().play("explosion");
        for (let i = 0; i < BLOW_UP_PARTICLES; i++) {
            const rads = randomFloatRange(0, Math.PI * 2);
            const speed = randomFloatRange(1, 3);
            const gray = randomIntRange(5, 9);
            const col = ("" + gray + "" + gray)
            this.serviceLocator.getWorld().addEntity(
                new Particle(this.serviceLocator,
                    this.x + randomFloatRange(-this.width/4, this.width/4), 
                    this.y + randomFloatRange(-this.height/4, this.height/4), 
                    randomIntRange(10, 60), 
                    "#" + col + col + col, 
                    30,
                    Math.sin(rads) * speed,
                    -Math.cos(rads) * speed
                    )
            );
        }
    }


    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
