import * as React from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

/* eslint-disable */
export default function MarkdownEditor({ handleChange, value }) {
  const [selectedTab, setSelectedTab] = React.useState('write');

  return (
    <ReactMde
      value={value}
      onChange={handleChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(<ReactMarkdown source={markdown} />)
      }
      childProps={{
        writeButton: {
          tabIndex: -1
        }
      }}
    />
  );
}
