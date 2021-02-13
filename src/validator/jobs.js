export const job = {
  type: "object",
  properties: {
    id: { type: 'string' },
    company: { type: 'string' },
    url: { type: 'string', nullable: true },
    date: { type: 'string' },
    note: { type: 'string', nullable: true },
    color: { type: 'string', nullable: true},
  },
  additionalProperties: false
}

export const jobs = {
  type: 'array',
  items: job
}