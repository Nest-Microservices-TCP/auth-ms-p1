import { QueryFailedError } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

/**
 * Este decorador es para métodos de servicio y manejara las excepciones rpc
 * de forma centralizada
 */

/**
 * Definición del decorador, básicamente es una función que retorna otra función.
 *
 * El nombre de la función sera el nombre del decorador
 *
 * Este también puede recibir parámetros, en este caso no son necesarios
 */
export function HandleRpcExceptions() {
  /**
   * La función que se retorna es la función decoradora, esta función se ejecuta en
   * al aplicar el decorador sobre el método (en este caso sera sobre un método)
   */
  return function (
    target: any, // Es el prototipo del objeto que contiene el método decorado
    propertyKey: string, // Es el nombre del método decorado como una cadena de texto
    /**
     * Es un objeto PropertyDescriptor que describe el método decorado (por ejemplo,
     * su valor, si es enumerable, configurable, etc)
     */
    descriptor: PropertyDescriptor,
  ) {
    // Se guarda una referencia al método original
    const originalMethod = descriptor.value;

    // Reemplazamos el método original con uno nuevo
    descriptor.value = async function (...args: any[]) {
      try {
        /**
         * Intentamos ejecutar el método original dentro del nuevo método y usando
         * la lógica para el manejo de excepciones rpc.
         *
         * Usamos apply para ejecutar el método original, manteniendo el contexto (this)
         * y pasando los argumentos que se recibieron
         */
        return await originalMethod.apply(this, args);
      } catch (error) {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = `Error in ${propertyKey}: ${error.message || error}`;

        if (error instanceof QueryFailedError) {
          status = HttpStatus.BAD_REQUEST;
          message = `Database error: ${error.message || error}`;
        }

        throw new RpcException({ status, message });
      }
    };

    /**
     * Finalmente se retorna el descriptor del método, que ahora contiene la lógica de
     * manejo de excepciones
     */
    return descriptor;
  };
}
