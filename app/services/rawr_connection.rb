# USE HTTP PARTY / SOMETHING SIMILAR TO CONNECT TO THE API

class RawrConnection < SolidService::Base
  def call
    success!

    fail!(error: 'There was an error with at least one of the files')
  end
end
