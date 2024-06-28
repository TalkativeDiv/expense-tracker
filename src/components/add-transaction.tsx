"use client"
import { useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { addTransaction } from '@/app/actions/add-transaction';
import { useToast } from './ui/use-toast';
export function AddTransaction() {
    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null);

    const clientAction = async (formData: FormData) => {
        const { error } = await addTransaction(formData);

        if (error) {
            toast({
                title: "Error",
                description: error.toString(),
                variant: "destructive"
            })
        } else {
            toast({
                title: "Success",
                description: "Transaction Added",
            })
            formRef.current?.reset();
        }
    };

    return (
        <>
            <h3 className="text-lg font-semibold">Add Transaction</h3>
            <form action={clientAction} ref={formRef}>
                <div className='form-control'>
                    <Label htmlFor='text'>Text</Label>
                    <Input
                        type='text'
                        id='text'
                        name='text'
                        placeholder='Enter text...'
                    />
                </div>
                <div className='form-control'>
                    <Label htmlFor='amount'>
                        Amount <br />
                    </Label>
                    <Input
                        type='number'
                        name='amount'
                        id='amount'
                        placeholder='Enter (negative = expense)'
                        step='0.01'
                    />
                </div>
                <Button className='my-3.5 w-full'>Add transaction</Button>
            </form>
        </>
    )
}