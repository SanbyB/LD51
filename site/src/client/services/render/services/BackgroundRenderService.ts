interface Background {
    colour: {
        r: number;
        g: number;
        b: number;
    };
    hazeAmount: number;
    fog: {
        minDepth: number;
        maxDepth: number;
        pixelAccuracy: number;
        depthAccuracy: number;
    };
}

export const Backgrounds = {
    DefaultBackground: {
        colour: {
            r: 0,
            g: 0,
            b: 1,
        },
        hazeAmount: 0,
        fog: {
            minDepth: 1000,
            maxDepth: 1000,
            pixelAccuracy: 4,
            depthAccuracy: 8,
        },
    }
};

export interface BackgroundShaderPositions {
    hazeR: WebGLUniformLocation;
    hazeG: WebGLUniformLocation;
    hazeB: WebGLUniformLocation;
    hazeAmount: WebGLUniformLocation;

    fadeAccuracy: WebGLUniformLocation;
    fadePixelAccuracy: WebGLUniformLocation;
    minViewDistance: WebGLUniformLocation;
    maxViewDistance: WebGLUniformLocation;
}

export class BackgroundRenderService {
    private gl: WebGLRenderingContext;
    private currentBackground: Background = Backgrounds.DefaultBackground;

    public init(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    public setBackground(background: Background) {
        this.currentBackground = background;
    }

    public applyShaderArguments(positions: BackgroundShaderPositions) {
        const { colour, hazeAmount, fog } = this.currentBackground;
        const { r, g, b } = colour;
        const { minDepth, maxDepth, pixelAccuracy, depthAccuracy } = fog;

        this.gl.uniform1f(positions.fadePixelAccuracy, pixelAccuracy);
        this.gl.uniform1f(positions.fadeAccuracy, depthAccuracy);
        this.gl.uniform1f(positions.minViewDistance, minDepth);
        this.gl.uniform1f(positions.maxViewDistance, maxDepth);

        this.gl.uniform1f(positions.hazeAmount, hazeAmount);
        this.gl.uniform1f(positions.hazeR, r);
        this.gl.uniform1f(positions.hazeG, g);
        this.gl.uniform1f(positions.hazeB, b);
    }

    public draw() {
        const { r, g, b } = this.currentBackground.colour;
        this.gl.clearColor(r, g, b, 1.0); // Clear to black, fully opaque
        this.gl.clearDepth(1.0); // Clear everything
        this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
        this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}
