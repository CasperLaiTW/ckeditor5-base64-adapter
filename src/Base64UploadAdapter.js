/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
/**
 * @module adapter-base64/uploadadapter
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import UploadAdapter from './UploadAdapter';

/**
 * @extends module:core/plugin~Plugin
 */
export default class Base64UploadAdapter extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [FileRepository];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'Base64UploadAdapter';
  }

  /**
   * @inheritDoc
   */
  init() {
    // Register Base64UploadAdapter
    this.editor.plugins.get(FileRepository).createUploadAdapter = loader => new UploadAdapter(loader, this.editor.t);
  }
}


