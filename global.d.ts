declare interface Window {
  $message: typeof import('antd')['message']
  $notification: typeof import('antd')['notification']
  $modal: typeof import('antd')['Modal']
}
