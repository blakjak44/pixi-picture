namespace pixi_picture {
    export class Mesh extends PIXI.Mesh {

        //protected _render(renderer: Renderer): void
        //    {
        //        this.calculateVertices();
        //        renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
        //        renderer.plugins[this.pluginName].render(this);
        //    }

        //_render(renderer: PIXI.Renderer): void
        //{
        //    const texture = (this as any)._texture;

        //    if (!texture || !texture.valid)
        //    {
        //        return;
        //    }


        //    const blendFilterArray = getBlendFilterArray(this.blendMode);

        //    if (blendFilterArray) {
        //        renderer.batch.flush();
        //        if (!renderer.filter.pushWithCheck(this, blendFilterArray)) {
        //            return;
        //        }
        //    }

        //    this.calculateVertices();
        //    renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
        //    renderer.plugins[this.pluginName].render(this);

        //    if (blendFilterArray) {
        //        renderer.batch.flush();
        //        renderer.filter.pop();
        //    }
        //},

        _render(renderer: PIXI.Renderer): void
            {
                const texture = (this as any)._texture;

                if (!texture || !texture.valid)
                {
                    return;
                }


                const blendFilterArray = getBlendFilterArray(this.blendMode);

                if (blendFilterArray) {
                    renderer.batch.flush();
                    if (!renderer.filter.pushWithCheck(this, blendFilterArray)) {
                        return;
                    }
                }

                // set properties for batching..
                // TODO could use a different way to grab verts?
                const vertices = this.geometry.buffers[0].data;
                // TODO benchmark check for attribute size..
                if (
                    this.shader.batchable
                    && this.drawMode === DRAW_MODES.TRIANGLES
                    && vertices.length < Mesh.BATCHABLE_SIZE * 2
                )
                {
                    this._renderToBatch(renderer);
                }
                else
                {
                    this._renderDefault(renderer);
                }


                if (blendFilterArray) {
                    renderer.batch.flush();
                    renderer.filter.pop();
                }
            }
    }
}
