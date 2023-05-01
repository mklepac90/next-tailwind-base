import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

type AddCardProps = {
  addCard: (title: string) => void;
};

const AddCard = ({ addCard }: AddCardProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="flex mt-10 px-5">
      <Input className="w-2/6 mr-5" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => {addCard(value); setValue('')}}>Add Card</Button>
    </div>
  )
}

export default AddCard