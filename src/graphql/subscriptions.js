/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRawVideos = /* GraphQL */ `
  subscription OnCreateRawVideos(
    $file_name: String
    $user_id: String
    $camera: Int
    $file_path: String
    $recorded_at: Int
  ) {
    onCreateRawVideos(
      file_name: $file_name
      user_id: $user_id
      camera: $camera
      file_path: $file_path
      recorded_at: $recorded_at
    ) {
      file_name
      user_id
      camera
      file_path
      recorded_at
      user_email
    }
  }
`;
export const onUpdateRawVideos = /* GraphQL */ `
  subscription OnUpdateRawVideos(
    $file_name: String
    $user_id: String
    $camera: Int
    $file_path: String
    $recorded_at: Int
  ) {
    onUpdateRawVideos(
      file_name: $file_name
      user_id: $user_id
      camera: $camera
      file_path: $file_path
      recorded_at: $recorded_at
    ) {
      file_name
      user_id
      camera
      file_path
      recorded_at
      user_email
    }
  }
`;
export const onDeleteRawVideos = /* GraphQL */ `
  subscription OnDeleteRawVideos(
    $file_name: String
    $user_id: String
    $camera: Int
    $file_path: String
    $recorded_at: Int
  ) {
    onDeleteRawVideos(
      file_name: $file_name
      user_id: $user_id
      camera: $camera
      file_path: $file_path
      recorded_at: $recorded_at
    ) {
      file_name
      user_id
      camera
      file_path
      recorded_at
      user_email
    }
  }
`;
