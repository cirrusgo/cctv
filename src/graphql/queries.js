/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRawVideos = /* GraphQL */ `
  query GetRawVideos($user_id: String!, $file_name: String!) {
    getRawVideos(user_id: $user_id, file_name: $file_name) {
      file_name
      user_id
      camera
      file_path
      recorded_at
      user_email
    }
  }
`;
export const listRawVideos = /* GraphQL */ `
  query ListRawVideos(
    $filter: TableRawVideosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRawVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        file_name
        user_id
        camera
        file_path
        recorded_at
        user_email
      }
      nextToken
    }
  }
`;
