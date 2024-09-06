import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';


/* 
    1. Render the component.
    2. Manipulate the component or find an element in it.
    3. Assertion - Make sure the component is doing what we expect it to do.
*/
test('it shows two inputs and a button', () => {
    // 1
    render(<UserForm />);
    
    // 2
    const inputs = screen.getAllByRole('textbox');
    const button =  screen.getByRole('button');
    
    // 3
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

/* 
    1. Render the component.
    2. Find the two inputs.
    3. Simulate typing in a name.
    4. Simulate typing in an email.
    5. Find the button.
    6. Simulate clicking the button.
    7. Assertion to make sure onUserAdd gets called with name and email.
*/
test('it calls onUserAdd when the form is submitted', async () => {
    
    const mock = jest.fn();

    // 1
    render(<UserForm onUserAdd={mock} />);
    
    // 2
    const nameInput = screen.getByRole('textbox', {name: /name/i});
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    
    // 3
    await user.click(nameInput);
    await user.keyboard('jane');

    // 4
    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    // 5
    const button = screen.getByRole('button');

    // 6
    await user.click(button);

    // 7
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' });

});