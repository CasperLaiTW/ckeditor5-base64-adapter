/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * Upload adapter for Base64.
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
/* globals window */
export default class UploadAdapter {
  /**
   * Creates a new adapter instance.
   *
   * @param {module:upload/filerepository~FileLoader} loader
   * @param {module:utils/locale~Locale#t} t
   */
  constructor(loader, t) {
    /**
     * FileLoader instance to use during the upload.
     *
     * @member {module:upload/filerepository~FileLoader} #loader
     */
    this.loader = loader;

    /**
     * Locale translation method.
     *
     * @member {module:utils/locale~Locale#t} #t
     */
    this.t = t;
  }

  /**
   * Starts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#upload
   * @returns {Promise}
   */
  upload() {
    return new Promise((resolve, reject) => {
      const reader = this.reader = new window.FileReader();

      reader.onload = function () {
        resolve({ default: reader.result });
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.onabort = function () {
        reject();
      };

      reader.readAsDataURL(this.loader.file);
    });
  }

  /**
   * Aborts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#abort
   * @returns {Promise}
   */
  abort() {
    if (this.reader) {
      this.reader.abort();
    }
  }
}
