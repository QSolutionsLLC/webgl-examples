const SHADER_TYPES = {
    VERTEX: 0,
    FRAGMENT: 1,
}

/**
 * 
 * @param {*} gl 
 * @param {Object} shaderMeta
 * @param {String} shaderMeta.vertexShaderFilename
 * @param {String} shaderMeta.fragmentShaderFilename
 */
async function createProgramFromShaders(gl, shaderMeta)
{
    const program = gl.createProgram();
    const vertexShader = await fetchAndCompileShader(gl, shaderMeta.vertexShaderFilename, SHADER_TYPES.VERTEX)
    const fragmentShader = await fetchAndCompileShader(gl, shaderMeta.fragmentShaderFilename, SHADER_TYPES.FRAGMENT)

    // gl.getProgramInfoLog(program);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    // Link Program; returns 0 if an error occurs
    if(gl.linkProgram(program) === 0){
        console.warn('gl.linkProgram(program) failed with error code 0.')
    }

    return program;
}

/**
 * 
 * @param {*} gl 
 * @param {*} shaderFilename 
 * @param {*} shaderType 
 */
async function fetchAndCompileShader(gl, shaderFilename, shaderType){
    // Fetch
    const response = await fetch(shaderFilename);
    const shaderSource = await response.text();

    // Create & Compile
    const shader = shaderType === SHADER_TYPES.VERTEX
        ? gl.createShader(gl.VERTEX_SHADER)
        : gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    // TODO: Throw
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(`Error compiling shader: ${shaderMeta.filename}`)
        console.warn(gl.getShaderInfoLog(shader));
    }

    return shader;
}
