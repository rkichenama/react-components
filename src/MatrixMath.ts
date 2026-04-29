class MatrixMath {
  // Convert matrix to 2D array
  static toArray(matrix: number[][] | Set<number[]> | Set<Set<number>>) {
    return Array.isArray(matrix)
      ? matrix
      : Array.from(matrix).map(arr => Array.from(arr));
  }

  // Matrix transpose
  static transpose(matrix: number[][] | Set<number[]> | Set<Set<number>>) {
    const array = this.toArray(matrix);
    const transposed = array[0].map((_, i) => array.map(row => row[i]));
    return transposed;
  }

  // Matrix multiplication by vector
  static multiplyByVector(
    matrix: number[][] | Set<number[]> | Set<Set<number>>,
    vector: number[] | Set<number>
  ) {
    const array = this.toArray(matrix);
    const vectorArray = Array.from(vector);
    const product = array.map(row =>
      row.reduce((acc, val, i) => acc + val * vectorArray[i], 0)
    );
    return product;
  }

  // Matrix multiplication by matrix
  static multiplyByMatrix(
    matrixA: number[][] | Set<number[]> | Set<Set<number>>,
    matrixB: number[][] | Set<number[]> | Set<Set<number>>
  ) {
    const arrayA = this.toArray(matrixA);
    const arrayB = this.toArray(matrixB);
    const product = arrayA.map(row =>
      this.multiplyByVector(this.transpose(arrayB), row)
    );
    return product;
  }

  // Matrix multiplication by scalar
  static multiplyByScalar(
    matrix: number[][] | Set<number[]> | Set<Set<number>>,
    scalar: number
  ) {
    const array = this.toArray(matrix);
    const product = array.map(row => row.map(val => val * scalar));
    return product;
  }
}
