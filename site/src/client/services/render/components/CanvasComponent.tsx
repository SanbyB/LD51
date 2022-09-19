import * as React from "react";

export interface CanvasComponentProps {
    id: string;
    resolution: number;
    dom_width: number;
    dom_height: number;
    width: number;
    height: number;
}

export class CanvasComponent extends React.PureComponent<CanvasComponentProps> {
    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    public render() {
        return (
            <canvas
                ref="canvas"
                id={this.props.id}
                width={this.props.dom_width / this.props.resolution}
                height={this.props.dom_height / this.props.resolution}
                style={{
                    width: this.props.dom_width,
                    height: this.props.dom_height,
                    imageRendering: "pixelated",
                }}
            />
        );
    }

    public componentDidMount() {
        this.canvas = this.refs.canvas as HTMLCanvasElement;
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasContext.imageSmoothingEnabled = false;
    }

    public getRenderContext() {
        return this.canvasContext;
    }

}
