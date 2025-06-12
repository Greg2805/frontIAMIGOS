import { Component } from '@angular/core';
import {RobotStatusComponent} from "./robot-status/robot-status.component";
import {PointsOfInterestComponent} from "./points-of-interest/points-of-interest.component";
import {DirectionControlComponent} from "./direction-control/direction-control.component";
import {SpeedControlComponent} from "./speed-control/speed-control.component";
import {FloorMapComponent} from "./floor-map/floor-map.component";


@Component({
  selector: 'app-control',
  standalone: true,
  imports: [
    RobotStatusComponent,
    PointsOfInterestComponent,
    DirectionControlComponent,
    SpeedControlComponent,
    
  ],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss'
})
export class ControlComponent {

}
