const {
  ForbiddenError,
  NotFoundError,
} = require('../../commons/exceptions');

class ExportsHandler {
  constructor(validator, playlistsService, producerService) {
    this._validator = validator;
    this._playlistsService = playlistsService;
    this._producerService = producerService;
  }

  async postExportPlaylistHandler(request, h) {
    const { userId } = request.auth.credentials;
    const { playlistId } = request.params;

    const isExist = await this._playlistsService.isPlaylistExists(playlistId);
    //console.log('isExist: ', isExist);

    if (!isExist) {
      throw new NotFoundError('playlist tidak ditemukan');
    }

    const isOwner = await this._playlistsService.isPlaylistOwnedBy(
      playlistId,
      userId,
    );
    //console.log('isOwner:', isOwner);

    if (!isOwner) {
      throw new ForbiddenError('anda tidak berhak mengakses resource ini');
    }

    const { targetEmail } = this._validator.validatePostExportPlaylistsPayload(request.payload);

    const message = {
      playlistId,
      targetEmail,
    };

    await this._producerService.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    console.log('response: ', response);
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
