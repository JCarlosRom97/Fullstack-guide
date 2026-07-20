import Input from '../../../shared/components/FormElements/Input/Input';
import './../PlaceForm.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './../../../shared/utils/validators'
import Button from '../../../shared/components/FormElements/Button/Button';
import { useForm } from '../../../shared/hooks/useForm';

const NewPlace = () => {

  const { formState, inputHandler } = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  }, false)


  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)
  }

  return <form className='place-form' onSubmit={placeSubmitHandler}>
    <Input
      id='title'
      element={'input'}
      label={'Title'}
      errorText='Place enter a valid title'
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
    />
    <Input
      id='description'
      element={'textarea'}
      label={'Description'}
      errorText='Place enter a valid description (at least 5 characters).'
      validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
      onInput={inputHandler}
    />
    <Input
      id='address'
      element={'input'}
      label={'Address'}
      errorText='Place enter a valid address'
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
    />
    <Button type='submit' disabled={!formState.isValid}>
      ADD Place
    </Button>
  </form>
};

export default NewPlace;