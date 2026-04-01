import { memo } from 'react'

const JewelBucket = memo(function JewelBucket({ jewelList }) {
  return (
    <div className="jewel-bucket">
      <div className="bucket-header">
        <span className="bucket-title">🏆 Jewel Collection</span>
        {jewelList.length > 0 && (
          <span className="bucket-count">{jewelList.length}</span>
        )}
      </div>

      {jewelList.length === 0 ? (
        <div className="bucket-empty">No jewels yet… keep going! 💫</div>
      ) : (
        <div className="bucket-gems">
          {jewelList.map((item, idx) => (
            <span
              key={item.id}
              className="bucket-gem"
              style={{ animationDelay: `${Math.min(idx, 4) * 0.04}s` }}
            >
              {item.gem}
            </span>
          ))}
        </div>
      )}
    </div>
  )
})

export default JewelBucket
