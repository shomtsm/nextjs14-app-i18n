export default function SampleComponenet({
  t,
}: {
  t: (path: string) => string
}) {
  return (
    <table style={{ textAlign: 'left', marginTop: '16px' }}>
      <tbody>
        <tr>
          <th>{t('sample.can-display')}</th>
          <td>
            <button>{t('products.cart')}</button>
          </td>
        </tr>
        <tr>
          <th>{t('sample.can-not-find-value')}</th>
          <td>
            <button>{t('products.cart3')}</button>
          </td>
        </tr>
        <tr>
          <th>{t('sample.can-not-display-parent')}</th>
          <td>
            <button>{t('products')}</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
