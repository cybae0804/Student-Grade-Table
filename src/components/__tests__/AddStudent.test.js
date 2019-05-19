import React from 'react';
import { shallow, mount } from 'enzyme';
import { Form } from 'semantic-ui-react';
import AddStudent from '../AddStudent';

describe('<AddStudent />', function() {
  beforeEach(function() {
    this.props = {
      Firebase: {
        addStudentToServer: jest.fn()
      }
    }
  });

  it('renders', function() {
    const wrapper = shallow(<AddStudent.wrappedComponent />);
    wrapper.toJson
    expect(wrapper.find(Form.Field).length).toBe(3);
  });

  it('clicking the submit button with no input displays error messages', function() {
    const wrapper = mount(<AddStudent.wrappedComponent />);
    const SubmitBtn = wrapper.findWhere(n => n.contains('Submit') && n.type() === 'button');
    
    SubmitBtn.simulate('click');

    wrapper.find('div.error').forEach((node) => {
      expect(node.text()).not.toBe('');
    });
  });

  it('clear button clears errors', function() {
    const wrapper = mount(<AddStudent.wrappedComponent />);
    const SubmitBtn = wrapper.findWhere(n => n.contains('Submit') && n.type() === 'button');
    const ClearBtn = wrapper.findWhere(n => n.contains('Clear') && n.type() === 'button');

    SubmitBtn.simulate('click');
    ClearBtn.simulate('click');

    wrapper.find('div.error').forEach((node) => {
      expect(node.text()).toBe('');
    });
  });
});
